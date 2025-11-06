function InputComments() {
    return <div>
        <form>
            <h4>Comment Section</h4>
            <div className="group" style={{ margin: "4px 0" }}>
                <input type="text" required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Post Comment</label>
            </div>

            <div className="group">
                <input type="text" required disabled />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Email</label>
            </div>
            <button type="button" style={{ marginTop: "10px" }} className="btn btn-success">Submit</button>
        </form>
    </div>
}
export default InputComments