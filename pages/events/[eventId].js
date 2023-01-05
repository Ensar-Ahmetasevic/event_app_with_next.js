import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import { Fragment } from "react";
import EventSummery from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Comments from "../../components/input/comments";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  // This function "getEventById" will return one "event" e.i. the one for wich we are entering the ID. Thet "event" will be returned and
  // saved in the variable with the neme "returnedEvent".Returned "event" has a lot of informations to wich we can now acces, als: date,
  // images, location, title.

  // Since we have only 3 IDs in our "dummy-data", it means thath in "path" must be included exactly one of them, that is way we are
  // going to make "if" statemen

  if (!event) {
    return (
      <div className="center">
        <p>Page is Loading ...</p>
        <progress className="progress is-medium is-dark" max="100">
          45%
        </progress>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummery title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const eventsPaths = events.map((event) => ({
    params: { eventId: event.id },
  }));
  // eventsPaths contains array of {params: {eventId: event.id}}

  return {
    paths: eventsPaths,
    fallback: true,
    // false -> if we specified all possible "paths"
    // true -> if we did not specified all possible "paths"
    // blocking -> will not throw out neither "Error" neither "Loding" (from aour "if" satement), it will simply keep showing current
    // page as lon as data faching are not done.
  };
}

export default EventDetailPage;
