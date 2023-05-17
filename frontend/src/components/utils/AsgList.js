function AsgList({asgslist}) {
  const listItems = asgslist.map((asg, index) => {
    const rank = index + 1;

    return (
      <tr key={rank}>
        <th scope="row">{rank}</th>
        <td>{asg}</td>
      </tr>
    );
  });

  return (
    <div className="col-7 mx-auto card custom-card">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sr. No</th>
            <th scope="col">Assigment</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </table>
    </div>
  );
}

export default AsgList;
