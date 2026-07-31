import "./globals.css";
import type { Metadata } from "next";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { getPublicApi } from "@/lib/serverApi";

const fallbackTitle = "Ahmed Ismail | Full Stack Developer";
const fallbackDescription = "Modern Full Stack Developer Portfolio";

const getSiteUrl = () => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const response = await getPublicApi("/seo", { seo: null });
  const seo = response.seo;
  const title = seo?.metaTitle || fallbackTitle;
  const description = seo?.metaDescription || fallbackDescription;

  return {
    metadataBase: getSiteUrl(),
    title,
    description,
    keywords: seo?.metaKeywords?.split(",").map((keyword: string) => keyword.trim()),
    icons: { icon: "/logo.jpeg" },
    openGraph: {
      title,
      description,
      type: "website",
      url: seo?.siteUrl || getSiteUrl(),
      images: seo?.ogImage?.url ? [seo.ogImage.url] : ["/hero.png"],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try { const theme = localStorage.getItem('portfolio-theme'); if (theme === 'light' || theme === 'dark') { document.documentElement.classList.toggle('dark', theme === 'dark'); document.documentElement.dataset.theme = theme; document.documentElement.style.colorScheme = theme; } } catch {}`,
          }}
        />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: { background: "#07111f", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" },
              success: { iconTheme: { primary: "#a855f7", secondary: "#fff" } },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
