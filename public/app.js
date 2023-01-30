fetch("get_data.php")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al obtenir les dades!");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data)
  })