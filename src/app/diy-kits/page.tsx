"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getDiySuggestions } from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Lightbulb, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/language-context";

function SubmitButton() {
  const { t } = useLanguage();
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? t('gettingSuggestions') : t('getSuggestions')}
    </Button>
  );
}

export default function DiyKitsPage() {
  const { t } = useLanguage();
  const initialState = { message: null, suggestions: [], errors: {} };
  const [state, dispatch] = useFormState(getDiySuggestions, initialState);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline mb-4">{t('diyKitRecommender')}</h1>
          <p className="text-lg text-muted-foreground">
            {t('diyKitRecommenderDescription')}
          </p>
        </div>

        <Card className="shadow-lg">
          <form action={dispatch}>
            <CardHeader>
              <CardTitle>{t('describeYourIssue')}</CardTitle>
              <CardDescription>{t('describeYourIssueDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="scooterModel">{t('scooterModel')}</Label>
                <Input
                  id="scooterModel"
                  name="scooterModel"
                  placeholder={t('scooterModelPlaceholder')}
                  required
                />
                {state.errors?.scooterModel && (
                  <p className="text-sm text-destructive">{state.errors.scooterModel.join(", ")}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="userReportedIssue">{t('describeTheIssue')}</Label>
                <Textarea
                  id="userReportedIssue"
                  name="userReportedIssue"
                  placeholder={t('describeTheIssuePlaceholder')}
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
                        {t('aiRecommendation')}
                    </CardTitle>
                </CardHeader>
              <CardContent>
                <p className="mb-4">{t(state.message)}</p>
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
