exports.handler = async () => {
  console.log("Function ran");

  const data = { name: "Mario", age: 20, job: "plumber" };

  // return response to browser
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
