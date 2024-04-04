function MyAssingmentCard({ assignment }) {
  const { title, marks, feedback, obtainmarks, thumbnail, status } = assignment;
  const statusColor = {
    color: status === "completed" ? "green" : "black",
  };

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-28 h-28">
                <img src={thumbnail} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="text-xl italic font-bold">{title} </div>
            </div>
          </div>
        </td>
        <td className="text-xl">{marks}</td>

        <th>
          <button className="btn btn-ghost btn-xs font-bold text-xl">
            {status}{" "}
          </button>
        </th>
        <th>
          <td className="text-xl">{obtainmarks}</td>
        </th>
        <td className="text-lg">{feedback}</td>
      </tr>
    </>
  );
}

export default MyAssingmentCard;
