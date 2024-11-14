// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, arrayRemove, arrayUnion, getDocs, addDoc, query, deleteDoc, updateDoc, doc, where } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"; // If using Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA3DA5YHaWVFuxGMU_K0AT7IvxvCIr-zc",
  authDomain: "queryactivity-75221.firebaseapp.com",
  projectId: "queryactivity-75221",
  storageBucket: "queryactivity-75221.firebasestorage.app",
  messagingSenderId: "700057125516",
  appId: "1:700057125516:web:9a59545be11ff702d4f1a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized:", app);

export { db, collection, getDocs, addDoc };


const teams = [
  {
    name: "Real Madrid",
    city: "Madrid",
    country: "Spain",
    topScorers: ["Ronaldo", "Benzema", "Hazard"],
    worldwideFans: 798
  },
  {
    name: "Barcelona",
    city: "Barcelona",
    country: "Spain",
    topScorers: ["Messi", "Suarez", "Puyol"],
    worldwideFans: 738
  },
  {
    name: "Manchester United",
    city: "Manchester",
    country: "England",
    topScorers: ["Cantona", "Rooney", "Ronaldo"],
    worldwideFans: 755
  },
  {
    name: "Manchester City",
    city: "Manchester",
    country: "England",
    topScorers: ["Sterling", "Aguero", "Haaland"],
    worldwideFans: 537
  },
  {
    name: "Brazil National Team",
    city: "Not applicable",
    country: "Brazil",
    topScorers: ["Ronaldinho", "Cafu", "Bebeto"],
    worldwideFans: 950
  },
  {
    name: "Argentina National Team",
    city: "Not applicable",
    country: "Argentina",
    topScorers: ["Messi", "Batistuta", "Maradona"],
    worldwideFans: 888
  },
  {
    name: "Atletico Madrid",
    city: "Madrid",
    country: "Spain",
    topScorers: ["Aragonés", "Griezmann", "Torres"],
    worldwideFans: 400
  }
];

// Initialize Firestore and set the database reference
const db = getFirestore(app);

// Function to add each team to Firestore if it does not already exist
async function addTeams() {
  const teamsRef = collection(db, "teams");

  for (const team of teams) {
    try {
      // Check if the team already exists based on the team name
      const q = query(teamsRef, where("name", "==", team.name)); // Query using the team name

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // If no existing team found, add the new team
        const docRef = await addDoc(teamsRef, team);
        console.log("Document written with ID: ", docRef.id);
      } else {
        console.log(`Team with name "${team.name}" already exists.`);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

addTeams();

//TASK 2 --------------------------------------------------------------------------------------

//1. get teams in spain 
async function getTeamsInSpain() {
  const q = query(collection(db, "teams"), where("country", "==", "Spain"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`Team Name: ${doc.data().name}, Data:`, doc.data());
  });
}

getTeamsInSpain();

//2. teams in madrid spain 
async function getTeamsInMadridSpain() {
  const q = query(collection(db, "teams"), where("city", "==", "Madrid"), where("country", "==", "Spain"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`Team Name: ${doc.data().name}, Data:`, doc.data());
  });
}

getTeamsInMadridSpain();



//3. National teams 
async function getNationalTeams() {
  const q = query(collection(db, "teams"), where("city", "==", "Not applicable"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`Team Name: ${doc.data().name}, Data:`, doc.data());
  });
}

getNationalTeams();


//4. teams not in spain 
async function getTeamsNotInSpain() {
  const q = query(collection(db, "teams"), where("country", "!=", "Spain"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`Team Name: ${doc.data().name}, Data:`, doc.data());
  });
}

getTeamsNotInSpain();



//5. teams not in spain or engalnd 
async function getTeamsNotInSpainOrEngland() {
  const q = query(collection(db, "teams"), where("country", "not-in", ["Spain", "England"]));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`Team Name: ${doc.data().name}, Data:`, doc.data());
  });
}

getTeamsNotInSpainOrEngland();



//6. teams in spain with more than 700m fans 
async function getTeamsInSpainWithMoreThan700Fans() {
  const q = query(collection(db, "teams"), where("country", "==", "Spain"), where("worldwideFans", ">", 700));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`Team Name: ${doc.data().name}, Data:`, doc.data());
  });
}

getTeamsInSpainWithMoreThan700Fans();


//7. teams with fans between 500 and 600 
async function getTeamsWithFansInRange() {
  const q = query(collection(db, "teams"), where("worldwideFans", ">=", 500), where("worldwideFans", "<=", 600));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`Team Name: ${doc.data().name}, Data:`, doc.data());
  });
}

getTeamsWithFansInRange();


//8. teams where ronaldo is top scorer 
async function getTeamsWithRonaldo() {
  const teamsRef = collection(db, "teams");
  const q = query(teamsRef, where("topScorers", "array-contains", "Ronaldo")); // Query teams where "Ronaldo" is in the topScorers array

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("Team Name:", doc.data().name, "Data:", doc.data());
    });
  } catch (error) {
    console.error("Error getting teams with Ronaldo:", error);
  }
}

getTeamsWithRonaldo();

//9. Show all teams where Ronaldo, Maradona, or Messi is a top scorer
async function getTeamsWithTopScorers() {
  const teamsRef = collection(db, "teams");
  const q = query(teamsRef, where("topScorers", "array-contains-any", ["Ronaldo", "Maradona", "Messi"])); // Query teams where any of the players is in the topScorers array

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("Team Name:", doc.data().name, "Data:", doc.data());
    });
  } catch (error) {
    console.error("Error getting teams with top scorers:", error);
  }
}

getTeamsWithTopScorers();


// task 3 -------------------------------------------------------------------------------

// Update Real Madrid and Barcelona details
async function updateTeams() {
  const teamsRef = collection(db, "teams");

  // Update Real Madrid
  const realMadridQuery = query(teamsRef, where("name", "==", "Real Madrid"));
  const realMadridSnapshot = await getDocs(realMadridQuery);
  if (!realMadridSnapshot.empty) {
    const docRef = realMadridSnapshot.docs[0].ref;
    await updateDoc(docRef, {
      name: "Real Madrid FC",
      worldwideFans: 811,
      topScorers: arrayRemove("Hazard"),
      topScorers: arrayUnion("Crispo"),
    });
    console.log("Real Madrid updated successfully.");
  }

  // Update Barcelona
  const barcelonaQuery = query(teamsRef, where("name", "==", "Barcelona"));
  const barcelonaSnapshot = await getDocs(barcelonaQuery);
  if (!barcelonaSnapshot.empty) {
    const docRef = barcelonaSnapshot.docs[0].ref;
    await updateDoc(docRef, {
      name: "FC Barcelona",
      worldwideFans: 747,
      topScorers: arrayRemove("Puyol"),
      topScorers: arrayUnion("Deco"),
    });
    console.log("Barcelona updated successfully.");
  }
}

updateTeams();

// Update jersey colors for Real Madrid and Barcelona
async function updateJerseyColors() {
  const teamsRef = collection(db, "teams");

  // Update Real Madrid Jersey Colors
  const realMadridQuery = query(teamsRef, where("name", "==", "Real Madrid FC"));
  const realMadridSnapshot = await getDocs(realMadridQuery);
  if (!realMadridSnapshot.empty) {
    const docRef = realMadridSnapshot.docs[0].ref;
    await updateDoc(docRef, {
      color: {
        home: "White",
        away: "Black",
      },
    });
    console.log("Real Madrid jersey colors updated.");

    // Update Real Madrid away color to Purple
    await updateDoc(docRef, {
      "color.away": "Purple",
    });
    console.log("Real Madrid away jersey color updated to Purple.");
  }

  // Update Barcelona Jersey Colors
  const barcelonaQuery = query(teamsRef, where("name", "==", "FC Barcelona"));
  const barcelonaSnapshot = await getDocs(barcelonaQuery);
  if (!barcelonaSnapshot.empty) {
    const docRef = barcelonaSnapshot.docs[0].ref;
    await updateDoc(docRef, {
      color: {
        home: "Red",
        away: "Gold",
      },
    });
    console.log("Barcelona jersey colors updated.");

    // Update Barcelona away color to Pink
    await updateDoc(docRef, {
      "color.away": "Pink",
    });
    console.log("Barcelona away jersey color updated to Pink.");
  }
}

updateJerseyColors();
