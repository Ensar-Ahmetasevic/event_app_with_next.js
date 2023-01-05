import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";
import Head from "next/head";

function HomePage({ events }) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps(context) {
  const FeaturedEvents = await getFeaturedEvents();

  return {
    props: {
      events: FeaturedEvents,
    },
    revalidate: 1800, // every 1,5h request is going to be re-send
  };
}

export default HomePage;
