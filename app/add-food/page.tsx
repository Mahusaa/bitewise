"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Camera, Search } from "lucide-react"
import { FoodScanner } from "@/components/food-scanner"
import { FoodSearchResults } from "@/components/food-search-result"
import { dummyFoodDatabase } from "@/lib/dummy-data"
import { BottomNavbar } from "@/components/bottom-navbar"

export default function AddFoodPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim() === "") return

    setIsSearching(true)

    // Simulate search delay for a more realistic experience
    setTimeout(() => {
      // Filter dummy food database based on search query
      const results = dummyFoodDatabase.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20">
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Add Food</h1>
      </header>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="search">
            <Search className="h-4 w-4 mr-2" />
            Search
          </TabsTrigger>
          <TabsTrigger value="scan">
            <Camera className="h-4 w-4 mr-2" />
            Scan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Search Food</CardTitle>
              <CardDescription>Find food items in our database</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex space-x-2">
                <Input
                  placeholder="Search for a food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" disabled={isSearching}>
                  {isSearching ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Searching...
                    </span>
                  ) : (
                    "Search"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {searchResults.length > 0 && <FoodSearchResults results={searchResults} />}

          {searchQuery && searchResults.length === 0 && !isSearching && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No results found for "{searchQuery}"</p>
              <p className="text-sm mt-2">Try a different search term or browse popular foods</p>
            </div>
          )}

          {!searchQuery && !searchResults.length && (
            <div className="space-y-4 mt-6">
              <h3 className="text-sm font-medium">Popular Foods</h3>
              <FoodSearchResults results={dummyFoodDatabase.slice(0, 5)} />
            </div>
          )}
        </TabsContent>

        <TabsContent value="scan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Scan Food</CardTitle>
              <CardDescription>Take a photo of your food to identify it</CardDescription>
            </CardHeader>
            <CardContent>
              <FoodScanner />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <BottomNavbar />
    </div>
  )
}

