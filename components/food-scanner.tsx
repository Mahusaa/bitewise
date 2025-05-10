"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, FileImage, Scan, X } from "lucide-react"
import { dummyFoodDatabase } from "@/lib/dummy-data"
import { FoodSearchResults } from "./food-search-result"

export function FoodScanner() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState([])
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setCapturedImage(reader.result as string)
      // Not starting analysis automatically anymore
    }
    reader.readAsDataURL(file)
  }

  const triggerCameraInput = () => {
    cameraInputRef.current?.click()
  }

  const triggerGalleryInput = () => {
    galleryInputRef.current?.click()
  }

  const analyzeImage = () => {
    if (!capturedImage) return

    setIsScanning(true)
    setScanResults([])

    // Simulate scanning delay
    setTimeout(() => {
      // Return random items from dummy database as "scan results"
      const randomResults = [...dummyFoodDatabase].sort(() => 0.5 - Math.random()).slice(0, 3)

      setScanResults(randomResults)
      setIsScanning(false)
    }, 2000)
  }

  const resetScan = () => {
    setCapturedImage(null)
    setScanResults([])
  }

  return (
    <div className="space-y-4">
      {/* Hidden file inputs */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageCapture}
        ref={cameraInputRef}
        className="hidden"
      />

      <input type="file" accept="image/*" onChange={handleImageCapture} ref={galleryInputRef} className="hidden" />

      {!capturedImage ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Camera className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Take a photo of your food or select an image from your gallery
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <Button onClick={triggerCameraInput} className="flex items-center">
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
            <Button onClick={triggerGalleryInput} variant="outline" className="flex items-center">
              <FileImage className="h-4 w-4 mr-2" />
              From Gallery
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <Image
              src={capturedImage || "/placeholder.svg"}
              alt="Food image"
              width={400}
              height={300}
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute top-2 right-2 flex space-x-2">
              <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full" onClick={resetScan}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {scanResults.length === 0 && !isScanning && (
            <Button onClick={analyzeImage} className="w-full flex items-center justify-center">
              <Scan className="h-4 w-4 mr-2" />
              Analyze Food
            </Button>
          )}

          {isScanning ? (
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing image...
                </div>
              </CardContent>
            </Card>
          ) : scanResults.length > 0 ? (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Scan Results</h3>
              <FoodSearchResults results={scanResults} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

