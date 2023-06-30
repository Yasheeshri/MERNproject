import React, { useEffect, useState } from 'react';

const ParentDetails = ({ parent }) => {
  return (
    <div style={{ fontFamily: 'cursive' }}>
      <h2 style={{ fontFamily: 'cursive' }}>Parent Details</h2>
      <table className="table table-bordered table-sm table-hover table-striped table-responsive table-secondary col-sm-12">
        <tbody>
          <tr>
            <td>Parent Name</td>
            <td>{parent.parentName}</td>
          </tr>
          <tr>
            <td>User ID</td>
            <td>{parent.userId}</td>
          </tr>
          <tr>
            <td>Password</td>
            <td>{parent.password}</td>
          </tr>
          <tr>
            <td>Mobile No.</td>
            <td>{parent.mobileNumber}</td>
          </tr>
          <tr>
            <td>Child User ID</td>
            <td>{parent.childUserId}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              {parent.address.city}, {parent.address.state}, {parent.address.pincode}
            </td>
          </tr>
          <tr>
            <td>Parent Status</td>
            <td>{parent.parentstatus}</td>
          </tr>
          <tr>
            <td>Created On</td>
            <td>{new Date(parent.createdOn).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td>Updated On</td>
            <td>{parent.updatedOn ? new Date(parent.updatedOn).toLocaleDateString() : '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const AdminParentSearch = () => {
  const [parents, setParents] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedParent, setSelectedParent] = useState(null);

  // Fetching data from the database
  const fetchData = async (search) => {
    try {
      const response = await fetch(`http://localhost:5000/parent/parentsearch/${search}`);
      const data = await response.json();
      setParents(data);
    } catch (error) {
      console.log('Error fetching parent data:', error);
    }
  };

  useEffect(() => {
    fetchData(searchValue);
  }, [searchValue]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleParentClick = (parent) => {
    setSelectedParent(parent);
  };

  return (
    <div className="container" style={{ fontFamily: 'cursive' }}>
      <div className="row justify-content-center">
        <div className="col-sm-12">
          <div className="text-center">
            <h1 className="text-black" >
              Search Parents
            </h1>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by User ID"
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="col-sm-12">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover table-responsive">
              <thead>
                <tr>
                  <th scope="col">Parent Name</th>
                  <th scope="col">User ID</th>
                </tr>
              </thead>
              <tbody>
                {parents.map((parent) => (
                  <tr key={parent._id} onClick={() => handleParentClick(parent)}>
                    <td>{parent.parentName}</td>
                    <td>{parent.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {selectedParent && <ParentDetails parent={selectedParent} />}
      </div>
    </div>
  );
};

export default AdminParentSearch;
