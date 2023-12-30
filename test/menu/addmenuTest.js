const { expect } = require('chai');
const sinon = require('sinon');
const {menuModel} = require('./models/menuModel');
const validator = require('./middlewares/validations');
const { addMenu } = require('./modules/admin/menuController');

describe('addMenu', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should add menu successfully when title is unique', async () => {
    const req = { body: { title: 'New Menu', time: '12:00' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Stub the validator function to return an empty array (no validation errors)
    sinon.stub(validator, 'isRequired').returns([]);

    // Stub the mongoose.model method to simulate that the title doesn't already exist
    sinon.stub(menuModel, 'findOne').resolves(null);

    // Stub the menuModel.prototype.save method to simulate successful menu addition
    sinon.stub(menuModel.prototype, 'save').resolves({ _id: 'someId', ...req.body });
`11`
    await addMenu(req, res);

    // Verify that the response status is 200 and contains the expected message and data
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({
      message: 'Menu added successfully',
      data: { _id: 'someId', ...req.body },
    })).to.be.true;
  });

  it('should return an error when title already exists', async () => {
    const req = { body: { title: 'Existing Menu', time: '12:00' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Stub the validator function to return an empty array (no validation errors)
    sinon.stub(validator, 'isRequired').returns([]);

    // Stub the menuModel.findOne method to simulate that the title already exists
    sinon.stub(menuModel, 'findOne').resolves({ _id: 'someId', ...req.body });

    await addMenu(req, res);

    // Verify that the response status is 400 and contains the expected error message
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ error: 'Title already exists.' })).to.be.true;
  });

  it('should return an error when required fields are missing', async () => {
    const req = { body: { time: '12:00' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Stub the validator function to simulate missing required fields
    sinon.stub(validator, 'isRequired').returns(['title is required']);

    await addMenu(req, res);

    // Verify that the response status is 400 and contains the expected error message
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ error: ['title is required'] })).to.be.true;
  });

  it('should return an error when an exception occurs', async () => {
    const req = { body: { title: 'New Menu', time: '12:00' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Stub the validator function to return an empty array (no validation errors)
    sinon.stub(validator, 'isRequired').returns([]);

    // Stub the menuModel.findOne method to simulate an exception
    sinon.stub(menuModel, 'findOne').rejects(new Error('Database error'));

    await addMenu(req, res);

    // Verify that the response status is 400 and contains the expected error message
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: 'Database error' })).to.be.true;
  });
});
