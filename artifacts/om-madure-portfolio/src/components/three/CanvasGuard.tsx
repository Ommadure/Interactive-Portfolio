import { Component, type ErrorInfo, type ReactNode } from 'react';
import { StaticFallback } from './StaticFallback';
export class CanvasGuard extends Component<{ children: ReactNode; kind?: 'hero' | 'skills' | 'contact' }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error('3D scene failed; using the static fallback.', error, info);
    this.setState({ failed: true });
  }
  render() { return this.state.failed ? <StaticFallback kind={this.props.kind} /> : this.props.children; }
}
