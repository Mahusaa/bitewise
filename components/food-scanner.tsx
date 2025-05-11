"use client"

import { useState, useRef, useActionState, useTransition, FormEvent } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Camera, FileImage, Scan, X, Loader2 } from "lucide-react"
import { extractDataFromFood } from "@/app/actions/extract-food"
import FoodAdder from "./food-adder"
import imageCompression from 'browser-image-compression'

const initialState = {
  success: false,
  message: "",
  data: null,
}

export function FoodScanner() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition();
  const [extractState, extractAction] = useActionState(extractDataFromFood, initialState)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)


  const handleImageCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0]
    if (!imageFile) return


    const fileSizeMB = imageFile.size / (1024 * 1024);

    try {
      let finalFile = imageFile;

      if (fileSizeMB > 1) {
        const options = {
          maxSizeMB: 1,
          useWebWorker: true,
        }
        finalFile = await imageCompression(imageFile, options)
        const reader = new FileReader()
        reader.onload = () => {
          setCapturedImage(reader.result as string)
        }
        reader.readAsDataURL(finalFile)
      }
      const reader = new FileReader()
      reader.onload = () => {
        setCapturedImage(reader.result as string)
      }
      reader.readAsDataURL(finalFile)
    } catch (error) {
      console.error('Image compression error:', error)
    }
  }

  const triggerCameraInput = () => {
    cameraInputRef.current?.click()
  }

  const triggerGalleryInput = () => {
    galleryInputRef.current?.click()
  }

  const analyzeImage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!capturedImage) return;

    startTransition(() => {
      extractAction({ imageBase64: capturedImage });
    });
  };

  const resetScan = () => {
    setCapturedImage(null);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={analyzeImage}>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageCapture}
          ref={cameraInputRef}
          className="hidden"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageCapture}
          ref={galleryInputRef}
          className="hidden"
        />

        {!capturedImage ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Camera className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Take a photo of your food or select an image from your gallery
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <Button type="button" onClick={triggerCameraInput} className="flex items-center">
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
              <Button type="button" onClick={triggerGalleryInput} variant="outline" className="flex items-center">
                <FileImage className="h-4 w-4 mr-2" />
                From Gallery
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={capturedImage}
                alt="Food image"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8 rounded-full"
                  onClick={resetScan}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!extractState.data && (
              <Button
                type="submit"
                className="w-full flex items-center justify-center"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Scan className="h-4 w-4 mr-2" />
                    Analyze Foods
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </form>
      {extractState.data && (
        <FoodAdder data={extractState.data} />
      )}
    </div>
  )
}
