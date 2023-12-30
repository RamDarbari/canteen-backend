const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const {menuModel} = require('./models/menuModel');
const validator = require('./middlewares/validations');
const { updateMenu } = require('./modules/admin/menuController');

describe('updateMenu', () => {
  afterEach(() => {
    sinon.restore();
  });
  // it('should update menu successfully when title is unique', async () => {
  //   const req = { 
  //     body: { title: 'Updated Menu' },
  //     query: { id: 'someId' },
  //   };
  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.stub(),
  //   };
  
  //   // Stub the validator function to return an empty array (no validation errors)
  //   sinon.stub(validator, 'isRequired').returns([]);
  
  //   // Stub the menuModel.findOne method to simulate that the menu with the specified id exists
  //   sinon.stub(menuModel, 'findOne').resolves({ _id: 'someId', title: 'Existing Menu' });
  
  //   // Stub the menuModel.findByIdAndUpdate method to simulate successful menu update
  //   sinon.stub(menuModel, 'findByIdAndUpdate').resolves({ _id: 'someId', title: 'Updated Menu' });
  
  //   // Asynchronously call updateMenu
  //   await updateMenu(req, res);
  
  //   // Verify that the response status is 200 and contains the expected message and data
  //   expect(res.status.calledWith(200)).to.be.true;
  //   expect(res.json.calledWith({
  //     message: 'Menu updated successfully',
  //     data: { _id: 'someId', title: 'Updated Menu' },
  //   })).to.be.true;
  // });
  
  it('should return an error when title already exists', async () => {
    const req = { 
      body: { title: 'Duplicate Menu' },
      query: { id: 'someId' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next={
      statusbar:{title:""}
    }

    // Stub the validator function to return an empty array (no validation errors)
    sinon.stub(validator, 'isRequired').returns([]);

   // Stub the menuModel.findOne method to simulate different responses
sinon.stub(menuModel, 'findOne')
.onFirstCall().resolves({ _id: 'someId', title: 'Existing Menu' })
.onSecondCall().resolves({ _id: 'otherId', title: 'Duplicate Menu' });


    await updateMenu(req, res);

    // Verify that the response status is 400 and contains the expected error message
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: 'This title is already exists.' })).to.be.true;
  });

  it('should return an error when menu id is invalid', async () => {
    const req = { 
      body: { title: 'Updated Menu' },
      query: { id: 'invalidId' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Stub the validator function to return an empty array (no validation errors)
    sinon.stub(validator, 'isRequired').returns([]);

    // Stub the menuModel.findOne method to simulate that the menu with the specified id does not exist
    sinon.stub(menuModel, 'findOne').resolves(null);

    await updateMenu(req, res);

    // Verify that the response status is 400 and contains the expected error message
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: 'Invalid menu id' })).to.be.true;
  }); 

  it('should return an error when required fields are missing', async () => {
    const req = { 
      body: { },
      query: { id: 'someId' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Stub the validator function to simulate missing required fields
    sinon.stub(validator, 'isRequired').returns(['title is required']);

    await updateMenu(req, res);

    // Verify that the response status is 400 and contains the expected error message
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ error: ['title is required'] })).to.be.true;
  });

  it('should return 400 with a general error message if an exception occurs', async function () {
    // Mocking validator to return an empty error array
    sinon.stub(validator, 'isRequired').returns([]);
    
    // Mocking menuModel.findOne to return a value (menu ID exists)
    sinon.stub(menuModel, 'findOne').resolves({ _id: 'valid_id' });
    
  
    // Creating a sample req object
    const req = {
      body: { title: 'Updated Menu' },
      query: { id: 'valid_id' },
    };
  
    // Creating a sample res object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    // Creating a placeholder for next
    const next = sinon.stub();
  
    // Mocking menuModel.findByIdAndUpdate to throw an exception
    sinon.stub(menuModel, 'findByIdAndUpdate').throws(new Error('Some error message'));
  
    await updateMenu(req, res, next);
  
    // Expecting a 400 status with a general error message
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith(sinon.match({ message: sinon.match.string }))).to.be.true;
  
    // Restoring the original functions after the test
    validator.isRequired.restore();
    menuModel.findOne.restore();
    menuModel.findByIdAndUpdate.restore();
  });
  
});
