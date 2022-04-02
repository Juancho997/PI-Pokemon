import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Home from "../components/Home";
import Detail from "../components/Detail";

configure({ adapter: new Adapter() });

describe("<Home />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it("deberia renderizar 12 componentes <Detail />", () => {
    expect(wrapper.find(Detail)).toHaveLength(12);
  });

//   it('Un componente Todos deberia recibir como prop status con el valor "Todo"', () => {
//     expect(wrapper.contains(<Todos status="Todo" />)).toEqual(true);
//   });

//   it('Un componente Todos deberia recibir como prop status con el valor "InProgress"', () => {
//     expect(wrapper.contains(<Todos status="InProgress" />)).toEqual(true);
//   });

//   it('Un componente Todos deberia recibir como prop status con el valor "Done"', () => {
//     expect(wrapper.contains(<Todos status="Done" />)).toEqual(true);
//   });
});
