import classes from "./comment-list.module.css";

function CommentList(props) {
  const { items } = props; // const items = props.items

  return (
    <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            Post By{" "}
            <address>
              {" "}
              <b> {item.name} </b>{" "}
            </address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
