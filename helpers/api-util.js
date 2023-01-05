export async function getAllEvents() {
  const respons = await fetch(
    "https://nextjs-curs-default-rtdb.firebaseio.com/events.json"
  );
  //".json" is added while data wich we are fetching from "firebase" are in JSON form. "/events" because in this DB File are stored oure data.
  const data = await respons.json();

  const events = [];

  for (const key in data) {
    // loop throu ALL "key-s" (e1, e2, e3) in my "data"
    // and for every "key" push "new event" in "evnets" array wher "id" is "key", and where I then wanna
    // distribute all of the nested "data" which are stored under that "key" into that events object.
    // And to not manually write all these key value pairs (title:"..."), I'll use the spread operator "..." and just copy
    // everything from data (...data) for the given "key". So from this nested object here into object, which we push into events.
    // That should ensure that "events" is an array full of objects.

    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}
// Now it's "getFeaturedEvents()" which I wanna use in "index.js --> HomePage".
export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();

  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
