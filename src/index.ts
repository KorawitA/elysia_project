import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/hello", () => "Hello world")

  // get and params.
  .get("/hello/:name", ({ params }) => `Hello ${params.name}`)
  .get("/hello/:name/:age", ({ params }) => {

    const name = params.name;
    const age = params.age;

    return `Hello ${name} ${age}`

  })
  .get("/customers", () => {
    const customers = [
      { name: "John", age: 20 },
      { name: "Jane", age: 21 },
      { name: "Deff", age: 22 },
      { name: "Smith", age: 23 },
    ]
    return customers;
  })
  .get("/customers/:id", ({ params }) => {
    const customers = [
      { id: 1, name: "John", age: 20 },
      { id: 2, name: "Jane", age: 21 },
      { id: 3, name: "Deff", age: 22 },
      { id: 4, name: "Smith", age: 23 },
    ]
    const customer = customers.find(result => result.id == +params.id);

    if (!customer) {
      return "Customer Not found"
    }
    return customer;
  })

  .get("/customer/query", ({ query }) => {
    const name = query.name;
    const age = query.age;

    return `Query ${name} ${age}`
  })
  .get("/customer/status", () => {

    return new Response("Hello World", { status: 500 })
  })
  .post("/customers/create", ({ body }: { body: any }) => {
    console.log(body)
    const name = body.name;
    const age = body.age;

    return `body : ${name} ${age}`;
  })

  .put("/customers/update/:id", ({ params, body }: { params: any; body: any }) => {
    console.log(body)
    const customers = [
      { id: 1, name: "John", age: 20 },
      { id: 2, name: "Jane", age: 21 },
      { id: 3, name: "Deff", age: 22 },
      { id: 4, name: "Smith", age: 23 },
    ]
    const id = +params.id
    const name = body.name;
    const age = body.age;

    const customer = customers.map(result =>{
      if(result.id == id){
        result.name = name;
        result.age = age;
        return result
      }
      return result
    })
    return `body : ${customer.find(result=>result.id == id)}`;
  })

  .delete("/customers/update/:id", ({ params }) => {
    const customers = [
      { id: 1, name: "John", age: 20 },
      { id: 2, name: "Jane", age: 21 },
      { id: 3, name: "Deff", age: 22 },
      { id: 4, name: "Smith", age: 23 },
    ]
    const id = +params.id

    const customer = customers.filter(result=>
     result.id === id 
    )

    console.log(customer)

    return `Remove ${customer}`

  })


  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
