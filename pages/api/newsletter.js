import { connectDatabase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  //
  //

  if (req.method === "POST") {
    const userEmail = req.body.email;

    // server-side validation
    if (!userEmail || !userEmail.includes("@") || userEmail.trim() === "") {
      // if the email is not valid or if does not includes "@" simbol
      res.status(422).json({ message: "Invalid email address." });
      // 422 stands invalid input, sendig JS obcjet converted into JSON
      return; // with "return" code will STOP here and will not proceed
    }

    /* 
   // FIRST METHOD
    // Connection URL
    const url =
      "mongodb+srv://Ensar_MongoDB:Love1986+@cluster0.1odepbc.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);

    // Database Name
    const dbName = "newsletter";

    async function main() {
      // Useing connect method to connect to the server
      await client.connect();
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      const collection = await db
        .collection("emails")
        .insertOne({ email: userEmail });

      res.status(201).json({ message: "Signed up!" });
      // 201 signaling that user input was bad, sendig JS obcjet converted into JSON

      return "Data are successfully stored in DB";
    }

    main()
      .then(console.log)
      .catch(console.error)
      .finally(() => client.close()); */

    /******************************************/

    // And to make sure that "client" is available, I'll set it as a variable (let client), and set it to a value
    // in the first try block. And if we make it past first try block, "client" will be the connected database.
    // So calling "close" will work then.

    // connecting to MongoDB
    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the DB failed!" });

      // And if that failed to connect to dB, I don't want to continue with try-catch block (accessing and inserting in to DB).
      // And I certainly don't want to send back this response { message: "Signed up!" }.  So we will go with "return" and this
      // will prevent forward function execution.

      return;
    }

    // accessing and inserting in to DB
    try {
      insertDocument(client, "newsletter", { email: userEmail });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }

    res.status(201).json({ message: "Signed up!" });
    // 201 signaling that user input was bad, sendig JS obcjet converted into JSON
  }
}

export default handler;
