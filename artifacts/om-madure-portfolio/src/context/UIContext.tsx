import { createContext, useMemo, useReducer, type ReactNode } from 'react';
type State = { performanceMode: boolean; commandOpen: boolean; threeEnabled: boolean };
type Action = { type: 'performance' } | { type: 'command'; value: boolean } | { type: 'three' };
const initial: State = { performanceMode: false, commandOpen: false, threeEnabled: true };
function reducer(state: State, action: Action): State {
  if (action.type === 'performance') { const next = !state.performanceMode; return { ...state, performanceMode: next, threeEnabled: !next }; }
  if (action.type === 'command') return { ...state, commandOpen: action.value };
  return { ...state, threeEnabled: !state.threeEnabled };
}
export const UIContext = createContext<(State & { dispatch: React.Dispatch<Action> }) | null>(null);
export function UIProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const value = useMemo(() => ({ ...state, dispatch }), [state]);
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
