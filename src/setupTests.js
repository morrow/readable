import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.fetch = (url)=> {
  console.log('fetching', url)
  var p = new Promise((resolve, reject) => {
    resolve({
      response: {},
      json: ()=> {},
    })
  })
  return p
}
global.localStorage = {}
