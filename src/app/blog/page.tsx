"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts } from "@/lib/data";
import { useLanguage } from "@/context/language-context";

export default function BlogPage() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline mb-4">{t('blogTitle')}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('blogDescription')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.title} className="flex flex-col overflow-hidden group">
            {post.image && (
              <Link href="#" className="block overflow-hidden">
                <Image
                  src={post.image.imageUrl}
                  alt={post.image.description}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={post.image.imageHint}
                />
              </Link>
            )}
            <CardHeader>
              <CardTitle className="text-xl leading-snug">
                <Link href="#" className="hover:text-primary transition-colors">
                  {t(post.title)}
                </Link>
              </CardTitle>
              <p className="text-sm text-muted-foreground pt-1">{post.date}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{t(post.excerpt)}</p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="p-0" asChild>
                <Link href="#">{t('readMore')} &rarr;</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
