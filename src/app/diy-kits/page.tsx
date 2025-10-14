"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getDiySuggestions } from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Lightbulb, AlertTriangle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Getting Suggestions..." : "Get Suggestions"}
    </Button>
  );
}

export default function DiyKitsPage() {
  const initialState = { message: null, suggestions: [], errors: {} };
  const [state, dispatch] = useFormState(getDiySuggestions, initialState);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline mb-4">DIY Kit Recommender</h1>
          <p className="text-lg text-muted-foreground">
            Having an issue with your scooter? Describe the problem, and our AI will suggest relevant DIY kits to help you fix it.
          </p>
        </div>

        <Card className="shadow-lg">
          <form action={dispatch}>
            <CardHeader>
              <CardTitle>Describe Your Issue</CardTitle>
              <CardDescription>Provide your scooter model and a description of the problem.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="scooterModel">Scooter Model</Label>
                <Input
                  id="scooterModel"
                  name="scooterModel"
                  placeholder="e.g., Xiaomi M365 Pro"
                  required
                />
                {state.errors?.scooterModel && (
                  <p className="text-sm text-destructive">{state.errors.scooterModel.join(", ")}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="userReportedIssue">Describe the Issue</Label>
                <Textarea
                  id="userReportedIssue"
                  name="userReportedIssue"
                  placeholder="e.g., 'The scooter won't turn on after charging overnight. The charger light is green.'"
                  rows={4}
                  required
                />
                {state.errors?.userReportedIssue && (
                  <p className="text-sm text-destructive">{state.errors.userReportedIssue.join(", ")}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>
        
        {state.message && (
          <div className="mt-8">
            <Card className="bg-secondary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {state.suggestions && state.suggestions.length > 0 ? <Lightbulb className="text-primary"/> : <AlertTriangle className="text-destructive"/>}
                        AI Recommendation
                    </CardTitle>
                </CardHeader>
              <CardContent>
                <p className="mb-4">{state.message}</p>
                {state.suggestions && state.suggestions.length > 0 && (
                  <ul className="space-y-3">
                    {state.suggestions.map((kit, index) => (
                      <li key={index} className="flex items-center gap-3 p-3 bg-background rounded-md border">
                        <Package className="h-5 w-5 text-primary"/>
                        <span className="font-medium">{kit}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
