"use client"

import { ArrowLeft, Moon, Sun, Laptop } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useTheme } from "@/components/theme-provider"

interface ThemeSettingsProps {
  goBack: () => void
}

export function ThemeSettings({ goBack }: ThemeSettingsProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">外观设置</h1>
      </div>

      <Card>
        <CardContent className="p-4">
          <RadioGroup value={theme} onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}>
            <div className="flex items-center space-x-2 py-3">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="flex items-center">
                <Sun size={18} className="mr-2 text-amber-500" />
                浅色模式
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-3 border-t border-gray-100">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="flex items-center">
                <Moon size={18} className="mr-2 text-blue-500" />
                深色模式
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-3 border-t border-gray-100">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system" className="flex items-center">
                <Laptop size={18} className="mr-2 text-gray-500" />
                跟随系统
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="mt-6">
        <p className="text-sm text-gray-500">
          选择您喜欢的显示模式。浅色模式在白天使用更舒适，深色模式在夜间使用可减少眼睛疲劳。
        </p>
      </div>
    </div>
  )
}
