---
layout: blog
title: Blog
---

{% assign posts = site.pages
   | where: "section", "blog"
   | where: "layout", "post" %}

{% if posts.size > 0 %}
  <div class="blog-grid">
    {% for post in posts %}
      <article class="blog-card">
        <a href="{{ post.url | relative_url }}">
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt | strip_html | truncate: 180 }}</p>
        </a>
      </article>
    {% endfor %}
  </div>
{% else %}
  <p style="opacity:.6">Aún no hay artículos publicados.</p>
{% endif %}
