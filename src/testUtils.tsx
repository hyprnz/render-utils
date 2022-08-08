import { FunctionComponent, ReactElement, ReactNode } from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";

type FCWithChildren = FunctionComponent<{ children: ReactNode }>

interface IRenderer {
  render(ui: ReactElement, options?: RenderOptions): RenderResult
  /**
   * Wrap with an Apollo Client MockedProvider.
   *
   * Optionally provide mocks for any queries you expect in the test.
   */
  withGql(mocks?: MockedResponse[]): IRenderer
  /**
   * Wrap with a MemoryRouter.
   *
   * Optionally provide initial history entries, or the route on which to render the component.
   */
  withRouter(config?: { initialEntries?: string[]; route?: string }): IRenderer

}

const baseWrapper: FCWithChildren = ({ children }) => <>{children}</>;

export const renderer = makeRenderer(baseWrapper);

function makeRenderer(Providers: FCWithChildren): IRenderer {
  return {
    render: (ui: ReactElement, options: RenderOptions = {}) =>
      render(ui, { ...options, wrapper: Providers }),
    withGql: makeWithGql(Providers),
    withRouter: makeWithRouter(Providers),
  };
}

function makeWithGql(ParentProviders: FCWithChildren) {
  return function withGql(mocks: MockedResponse[] = []) {
    const Providers: FCWithChildren = ({ children }) => (
      <ParentProviders>
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      </ParentProviders>
    );
    return makeRenderer(Providers);
  };
}

function makeWithRouter(ParentProviders: FCWithChildren) {
  return function withRouter({ initialEntries = ["/"], route = "/" } = {}) {
    const Providers: FCWithChildren = ({ children }) => (
      <ParentProviders>
        <Router initialEntries={initialEntries} initialIndex={0}>
          <Routes>
            <Route path={route} element={<>{children}</>} />
          </Routes>
        </Router>
      </ParentProviders>
    );
    return makeRenderer(Providers);
  };
}
