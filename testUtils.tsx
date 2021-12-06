import { FunctionComponent, ReactElement } from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";

interface IRenderer {
  render: (ui: ReactElement, options?: RenderOptions) => RenderResult;
  withGql: (mocks?: MockedResponse[]) => IRenderer;
  withRouter: (config?: {
    initialEntries?: string[];
    route?: string;
  }) => IRenderer;
}

const baseWrapper: FunctionComponent = ({ children }) => <>{children}</>;

export const renderer = makeRenderer(baseWrapper);

function makeRenderer(Providers: FunctionComponent): IRenderer {
  return {
    render: (ui: ReactElement, options: RenderOptions = {}) =>
      render(ui, { ...options, wrapper: Providers }),
    withGql: makeWithGql(Providers),
    withRouter: makeWithRouter(Providers),
  };
}

function makeWithGql(ParentProviders: FunctionComponent) {
  return function withGql(mocks: MockedResponse[] = []) {
    const Providers: FunctionComponent = ({ children }) => (
      <ParentProviders>
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      </ParentProviders>
    );
    return makeRenderer(Providers);
  };
}

function makeWithRouter(ParentProviders: FunctionComponent) {
  return function withRouter({ initialEntries = ["/"], route = "/" } = {}) {
    const Providers: FunctionComponent = ({ children }) => (
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
