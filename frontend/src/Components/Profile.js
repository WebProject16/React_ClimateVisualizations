import {Delete} from '../API/request';

export default function Profile() {
    const DelProfile = async () => {
        await Delete ("/somePath", 
        (res) => {
            console.log(res.request.status)
        })
        console.log("todo: delete profile")
    }
    const post = [
        {id: 1, title: 'Hello world', content: 'Welcome'},
        {id: 2, title: 'Hello world', content: 'Welcome'},
        {id: 3, title: 'Hello world', content: 'Welcome'},
        {id: 4, title: 'Hello world', content: 'Welcome'},
        {id: 5, title: 'Hello world', content: 'Welcome'},

    ];
    const views = post.map((view)=> 
        <li key={view.id} className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{view.title}</h5>
        </div>
            <p className="mb-1">{view.content}</p>
        </li>  
    )
    return (
        <>
        <div>
            <h2>
                Welcome user!
            </h2>
        </div>
        <div className="list-group">
            {views}
        </div>
        <div>
            <button onClick={DelProfile} type="button" class="btn btn-outline-danger">Delete user</button>
        </div>
        </>
    )
}