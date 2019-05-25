import React from 'react';
import ClosedInventoriesProgressBars from '../ProgressBars/ClosedInventoriesProgressBar';
import OpenInventoriesProgressBar from '../ProgressBars/OpenInventoriesProgressBar';
import ApprovedInventoriesProgressBar from '../ProgressBars/ApprovedInventoriesProgressBar';

const SetterProgressBars = () => (
  <div>
    <div className="row">
      <div className="col-md-12">
        <ClosedInventoriesProgressBars />
      </div>
      <div className="col-md-12">
        <OpenInventoriesProgressBar />
      </div>
      <div className="col-md-12">
        <ApprovedInventoriesProgressBar />
      </div>
    </div>
  </div>
);
 
export default SetterProgressBars;