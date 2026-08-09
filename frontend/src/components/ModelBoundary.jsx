import { Component } from 'react'

/* A missing or malformed .glb throws inside the r3f tree, which would blank
   the whole hero canvas. This keeps the original geometry on screen instead
   — so the site is never broken by an absent model file. */
export default class ModelBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn('[hero] 3D model failed to load, using fallback geometry:', error.message)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
