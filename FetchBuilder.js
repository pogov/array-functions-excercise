class FetchBuilder {
  constructor() {
    this.params = [];
  }
  host(hostadress) {
    this.host = hostadress;
    return this;
  }
  port(portnumber) {
    this.port = portnumber;
    return this;
  }
  route(route) {
    this.route = route;
    return this;
  }
  method(method) {
    this.method = method;
    return this;
  }
  param(paramName, param) {
    this.params.push({ paramName, param });
    return this;
  }
  data(data) {
    this.data = data;
    return this;
  }
  headers(header) {
    this.headers = header;
    return this;
  }

  build() {
    const url = new URL(`${this.host}/${this.route}`);
    let options = {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.data),
    };
    if (this.params.length > 0) {
      this.params.forEach((p) => url.searchParams.append(p.paramName, p.param));
    }
    if (this.method === "GET" || this.method === "HEAD") {
      options = {
        method: this.method,
        headers: this.headers,
      };
    }
    return fetch(url, options);
  }
}

const fetcherInstanceBuilder = new FetchBuilder();

const fetcher = fetcherInstanceBuilder
  .host("https://jsonplaceholder.typicode.com")
  .route("comments")
  .param("postId", 1)
  .method("GET")
  .headers({
    "Content-Type": "application/json",
  })
  // .data({
  //   title: "Test 1",
  //   body: "test 1 body",
  //   userId: 10
  // })
  .build();

fetcher.then((res) => res.json()).then((data) => console.log(data));
