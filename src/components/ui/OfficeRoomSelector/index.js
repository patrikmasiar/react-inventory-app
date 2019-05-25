import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../../utils/apolloClient';
import { allOfficeRooms as officeRoomsQuery } from 'queries';

class OfficeRoomSelector extends Component {

  state = {
    loading: false,
    officeRoomsData: [],
  };

  componentDidMount() {
    this.getOfficeRoomsData(this.props.officeId);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.officeId !== nextProps.officeId) {
      this.getOfficeRoomsData(nextProps.officeId);
    }
  }

  getOfficeRoomsData = async (officeId) => {
    try {
      this.setState({loading: true});
      const response = await client.query({
        query: officeRoomsQuery,
        variables: {filter: {office: {id: officeId}}}, 
      });

      if(response && response.data.allOfficeRooms) {
        this.setState({ officeRoomsData: response.data.allOfficeRooms });
      }

      this.setState({loading: false});
    } catch(error) {
      console.log('Error load office rooms data', error);
      this.setState({loading: false});
    }
  };

  handleSelectChange = (event) => {
    const { value: selectedOfficeRoomId } = event.target;
    this.props.onSelectOfficeRoom(selectedOfficeRoomId);
  };

  render() {
    const {selectedOfficeRoom} = this.props;
    const {officeRoomsData, loading} = this.state;

    if(this.props.officeId.length === 0) {
      return (
        <div className="form-group">
          <label>Vybrať miestnosť</label>
          <input className="form-control" disabled value={"Zvoľte pobočku pre výber miestnosti"} />
        </div>
      );
    }

    if(loading) {
      return (
        <div className="form-group">
          <label>Vybrať miestnosť</label>
          <input className="form-control" disabled value={"Načítavam..."} />
        </div>
      );
    }

    if(officeRoomsData.length === 0) {
      return (
        <div className="form-group">
          <label>Vybrať miestnosť</label>
          <input className="form-control" disabled value={"Žiadne miestnosti sa nenašli"} />
        </div>
      );
    }

    return (
      <div className="form-group">
        <label>Vybrať miestnosť</label>
        <select className="form-control" value={selectedOfficeRoom} onChange={this.handleSelectChange}>
          <option value={''} disabled>Zvoľte miestnosť zo zoznamu</option>
          {officeRoomsData.map(officeRoom => {
            return (
              <option key={officeRoom.id} value={officeRoom.id}>{`${officeRoom.name} / ${officeRoom.tag}`}</option>
            );  
          })}
        </select>
      </div>
    );
  }
}

OfficeRoomSelector.propTypes = {
  officeId: PropTypes.string.isRequired,
  selectedOfficeRoom: PropTypes.string.isRequired,
  onSelectOfficeRoom: PropTypes.func.isRequired,
};
 
export { OfficeRoomSelector };