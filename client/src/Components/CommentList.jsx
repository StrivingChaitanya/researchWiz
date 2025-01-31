export default function CommentList(props) {
    return (
        <div style={{'marginTop': '2em'}}>
        {props.comments.length === 0 ? (
            <div>
                <p>Add comments here!</p>
            </div>
        ) : (
            props.comments.map((item, index) => (
            <div className="comment" key={index}>
                {/* <div className="comment-border"></div> */}
                <div className="comment-content">
                    <p>{item}</p>
                </div>
                {/* <div className="comment-border"></div> */}
            </div>
            ))
        )}
        </div>
    );
};  