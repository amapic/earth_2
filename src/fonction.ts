let pos = {
  B1: [45, 30],
  1: [30, 30],
  2: [30, 30],
  3: [30, 30],
  4: [30, 30],
  35: [15, 15],
  36: [15, 45],
  37: [45, 15],
  38: [45, 45],
  39: [45, 45],
  40: [15, 60],
  41: [60, 15],
  42: [45, 60],
  43: [60, 60],
};

export async function valideDeplacement(destination, setPoseCar) {
  const chemin: string[] = await updateTankPos(destination);
  let chemin2: [][] = [];
  // for (const a of chemin){
  //     chemin2.push(pos[a])
  // }
  for (const [key, value] of Object.entries(chemin)) {
    chemin2.push(pos[value]);
  }
  setPoseCar(chemin2[chemin.length - 1]);
//   return chemin2;

  // if (distance < 5) {
  //   setPoseCar([50, 50, 50]);
  // }
  // await updateTankPos()
}

async function updateTankPos(destination): Promise<string[]> {
  const response = await fetch(
    "http://localhost/power/php/fonction_partie.php?p=calcul_chemin&c1=t&c2=HQB" +
      "&c3=" +
      destination +
      "&joueur=R&partie=9&tour=0",
    {
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Request-Headers": "*",
      },
    }
  );

  const responseData = await response.json();
  return new Promise((successCallback, failureCallback) => {
    if (response.ok) {
      var dictOfResponseData: any = {};
      for (const [key, value] of Object.entries(responseData)) {
        dictOfResponseData[key] = value;
      }

      successCallback(dictOfResponseData["reponse"]);
    } else {
      failureCallback("error");
    }
  });
}
export default pos;
