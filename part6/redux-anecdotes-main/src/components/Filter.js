import {connect} from 'react-redux';
import {setFilter} from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
        filter <input onChange={handleChange} />
    </div>
  );
};

const mapStateToProps = (state) => ({filter: state.filter});

const mapDispatchToProps = {
  setFilter,
};

const ConnectedFilter = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Filter);

export default ConnectedFilter;
