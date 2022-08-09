# render-utils
Fluid interface test utility for rendering your components inside various providers.

## The problem

Rendering a component under test with any required providers can both bloat your tests and affect readability.

Consider this example, where it's hard to tell at first glance what is actually being tested.
```js
render(
    <MockedProvider mocks={[
        {
            request: { query: EXAMPLE_GQL, variables: { id: '123' } },
            result: {
                data: { example: "hello!" }
            },
        },
    ]} addTypename={false}>
        <MemoryRouter initialEntries={["/123"]} initialIndex={0}>
            <Routes>
                <Route path="/:id" element={<ExampleComponent />} />
            </Routes>
        </MemoryRouter>
    </MockedProvider>
)
```

## Example usage
This library aims to abstract away the provider noise, and leave only the test setup you care about.
```js
renderer
    .withGql([
        {
            request: { query: EXAMPLE_GQL, variables: { id: '123' } },
            result: {
              data: { example: "hello!" }
            },
        },
    ])
    .withRouter({ initialEntries: ["/123"], route: "/:id" })
    .render(<ExampleComponent />)
```

```js
// A more simple usage, wrapping our component with the router provider 
// but without needing to specify a specific path or route.
renderer
    .withRouter()
    .render(<ExampleComponent />)
```

## NEXT STEPS
- You should only have to take dependencies on the libraries you actually use... could we make it plugin based?