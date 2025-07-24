"use client";

import { useEffect } from "react";

interface MetaOptions {
  title?: string;
  description?: string;
  canonical?: string;
  icons: {
    icon?: string;
  };
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
}

export function generateMetaData(options: MetaOptions) {
  useEffect(() => {
    if (options.title) {
      document.title = options.title;
    }

    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(isProperty ? "property" : "name", name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    if (options.description) {
      updateMeta("description", options.description);
    }
    if (options.canonical) {
      let link = document.querySelector(
        "link[rel='canonical']"
      ) as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = options.canonical;
    }
    if (options.ogTitle) {
      updateMeta("og:title", options.ogTitle, true);
    }
    if (options.ogDescription) {
      updateMeta("og:description", options.ogDescription, true);
    }
    if (options.ogUrl) {
      updateMeta("og:url", options.ogUrl, true);
    }

    if (options.ogImage) {
      updateMeta("og:image", options.ogImage, true);
    }

    if (options.icons && options.icons.icon) {
      let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = options.icons.icon;
    }
  });
}
