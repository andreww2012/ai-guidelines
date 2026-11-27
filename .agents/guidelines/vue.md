# Vue

- Move static variables into a separate non-setup `<script>` block in Vue SFCs for performance (if there are only type declarations to move, this won't change anything).
- Do use inline composables: <https://alexop.dev/posts/inline-vue-composables-refactoring>
- Prefer `shallowRef` over `ref`, but only when that actually makes a difference (for example, `shallowRef(false)` does not).
- Avoid `reactive`; only use it when strictly necessary.
- Don't add `| null` as a possible type for refs for no reason - usually implicit `undefined` works just fine.
- Prefer `useTemplateRef` if it's available, and prefer not to add an explicit type parameter to it.
- Don't end an element's text with whitespace, including a line break before the closing tag: Vue keeps it as a space, which some browsers show when the text is selected.
  The same goes for whitespace before an element that may not render or be visible (`v-if`, `v-show`, etc.): move the space inside it, like `{{ label }}<span v-if="..."> (optional)</span>`.
  If the element has nothing but text, also start the text right after the opening tag.
- In runtime props declarations (not type-based), always set `required: true|false` explicitly.
- Don't put HTML comments at the root of `<template>`: Vue keeps them only in dev mode, where they make the component a fragment.
