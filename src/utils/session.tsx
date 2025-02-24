export const signup = (user:Object)=>{
    fetch("http://localhost:3000/sign/new",{
        method: "POST",
        body: JSON.stringify(user),
        headers: {
        "Content-Type": "application/json"
        }
    })
}

export const login = (user:Object) => (
    fetch("http://localhost:3000/sign", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
  );

  export const logout = ()=>{
    fetch("http://localhost:3000/sign",{method:"DELETE"})
  }