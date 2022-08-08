# render-utils
Fluid interface test utility for rendering your components inside various providers.

## Example usage
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

## NEXT STEPS
- You should only have to take dependencies on the libraries you actually use... could we make it plugin based.