import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, getInstance } from '@test/testUtils';

import TagPicker from '../index';
import Button from '../../Button';

const data = [
  {
    label: 'Eugenia',
    value: 'Eugenia',
    role: 'Master'
  },
  {
    label: <span>Kariane</span>,
    value: 'Kariane',
    role: 'Master'
  },
  {
    label: 'Louisa',
    value: 'Louisa',
    role: 'Master'
  }
];

describe('TagPicker', () => {
  it('Should clean selected default value', () => {
    const instance = getInstance(<TagPicker defaultOpen data={data} defaultValue={['Eugenia']} />);

    ReactTestUtils.Simulate.click(instance.root.querySelector('.rs-picker-toggle-clean'));

    expect(instance.root.querySelector('.rs-picker-toggle-placeholder').innerText).to.equal(
      'Select'
    );
  });

  it('Should not clean selected value', () => {
    const instance = getDOMNode(<TagPicker defaultOpen data={data} value={['Eugenia']} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelectorAll('.rs-tag').length).to.equal(1);
    expect(instance.querySelector('.rs-tag').innerText).to.equal('Eugenia');
  });

  it('Should output a TagPicker', () => {
    const Title = 'Title';
    const instance = getDOMNode(<TagPicker>{Title}</TagPicker>);
    assert.include(instance.className, 'rs-picker-tag');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<TagPicker disabled data={data} value={['Eugenia']} />);

    assert.ok(instance.className.match(/\bdisabled\b/));
    assert.ok(!instance.querySelector('.rs-tag-icon-close'));
  });

  it('Should output a button', () => {
    const instance = getInstance(<TagPicker toggleAs="button" />);
    assert.ok(instance.root.querySelector('button'));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<TagPicker block />);
    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    const instance = getInstance(<TagPicker defaultOpen data={data} value={[value]} />);
    assert.equal(instance.root.querySelector('.rs-tag').innerText, value);
    assert.equal(instance.menu.querySelector('.rs-checkbox-checked').innerText, value);
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    const instance = getInstance(<TagPicker defaultOpen data={data} defaultValue={[value]} />);

    assert.equal(instance.root.querySelector('.rs-tag').innerText, value);
    assert.equal(instance.menu.querySelector('.rs-checkbox-checked').innerText, value);
    assert.ok(instance.root.querySelector('.rs-tag-icon-close'));
  });

  it('Should render a group', () => {
    const instance = getInstance(<TagPicker defaultOpen groupBy="role" data={data} />);
    assert.ok(instance.menu.querySelector('.rs-picker-menu-group'));
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<TagPicker className="custom" placeholder="test" />);

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(
      <TagPicker
        placeholder="test"
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={['4']}
      />
    );
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Allow `label` to be an empty string', () => {
    const instance = getInstance(
      <TagPicker placeholder="test" data={[{ label: '', value: '1' }]} value={['1']} defaultOpen />
    );
    const checkbox = instance.menu.querySelector('.rs-checkbox-checked');

    assert.equal(checkbox.innerText, '');
  });

  it('Should render value by `renderValue`', () => {
    const instance = getDOMNode(
      <TagPicker
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={['bar']}
        renderValue={(value, items) => `${items[0].label}-${items[0].value}`}
      />
    );

    assert.equal(instance.querySelector('.rs-picker-tag-wrapper').innerText, 'foo-bar');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance = getDOMNode(
      <TagPicker
        renderValue={v => [v, placeholder]}
        data={[{ value: 1, label: '1' }]}
        value={[1]}
      />
    );

    // Invalid value
    const instance2 = getDOMNode(
      <TagPicker renderValue={v => [v, placeholder]} data={[]} value={[2]} />
    );

    assert.equal(instance.querySelector('.rs-picker-tag-wrapper').innerText, `1${placeholder}`);
    assert.equal(instance2.querySelector('.rs-picker-tag-wrapper').innerText, `2${placeholder}`);
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<TagPicker renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<TagPicker value={[2]} placeholder={'test'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should call `onChange` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <TagPicker defaultOpen onChange={doneOp} data={[{ label: '1', value: '1' }]} />
    );

    ReactTestUtils.Simulate.change(instance.menu.querySelector('input'));
  });

  it('Should call `onClean` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <TagPicker data={data} defaultValue={['Kariane']} onClean={doneOp} />
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onSelect` by keyCode=13 ', done => {
    const doneOp = (value, item) => {
      if (value[1] === 'Louisa' && item.value === 'Louisa') {
        done();
      }
    };
    const instance = getDOMNode(
      <TagPicker defaultOpen data={data} onSelect={doneOp} defaultValue={['Kariane']} />
    );

    ReactTestUtils.Simulate.keyDown(instance, { keyCode: 40 });
    ReactTestUtils.Simulate.keyDown(instance, { keyCode: 13 });
  });

  it('Should output a clean button', () => {
    const instance = getInstance(<TagPicker data={data} defaultValue={['Louisa']} />);
    assert.ok(instance.root.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onSearch` callback', done => {
    const doneOp = key => {
      if (key === 'a') {
        done();
      }
    };
    const instance = getDOMNode(<TagPicker defaultOpen onSearch={doneOp} />);
    const input = instance.querySelector('.rs-picker-search-input input');
    input.value = 'a';

    ReactTestUtils.Simulate.change(input);
  });

  it('Should focus item by keyCode=40 ', () => {
    const instance = getInstance(<TagPicker defaultOpen data={data} defaultValue={['Eugenia']} />);
    ReactTestUtils.Simulate.keyDown(instance.menu, { keyCode: 40 });
    assert.equal(instance.menu.querySelector('.rs-check-item-focus').innerText, 'Kariane');
  });

  it('Should focus item by keyCode=38 ', () => {
    const instance = getInstance(<TagPicker defaultOpen data={data} defaultValue={['Kariane']} />);
    ReactTestUtils.Simulate.keyDown(instance.menu, { keyCode: 38 });
    assert.equal(instance.menu.querySelector('.rs-check-item-focus').innerText, 'Eugenia');
  });

  it('Should call `onChange` by keyCode=13 ', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <TagPicker defaultOpen data={data} onChange={doneOp} defaultValue={['Kariane']} />
    );

    ReactTestUtils.Simulate.keyDown(instance, { keyCode: 13 });
  });

  it('Should call `onChange` by remove last item ', done => {
    const doneOp = value => {
      if (value.length === 1 && value[0] === 'Kariane') {
        done();
      }
    };
    const instance = getDOMNode(
      <TagPicker defaultOpen data={data} onChange={doneOp} defaultValue={['Kariane', 'Eugenia']} />
    );
    assert.equal(instance.querySelectorAll('.rs-tag').length, 2);
    ReactTestUtils.Simulate.keyDown(instance.querySelector('input'), { keyCode: 8 });
  });

  it('Should call `onChange` by removeTag ', done => {
    const doneOp = value => {
      if (value.length === 1 && value[0] === 'Eugenia') {
        done();
      }
    };
    const instance = getDOMNode(
      <TagPicker defaultOpen data={data} onChange={doneOp} defaultValue={['Kariane', 'Eugenia']} />
    );
    assert.equal(instance.querySelectorAll('.rs-tag').length, 2);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-tag-icon-close'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<TagPicker className="custom" defaultOpen />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<TagPicker style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<TagPicker classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render a button by toggleAs={Button}', () => {
    const instance = getDOMNode(<TagPicker open data={data} toggleAs={Button} />);
    assert.ok(instance.querySelector('.rs-btn'));
  });

  it('Should call `tagProps.onClose` ', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <TagPicker
        defaultOpen
        data={data}
        defaultValue={['Kariane', 'Eugenia']}
        tagProps={{
          onClose: doneOp
        }}
      />
    );
    assert.equal(instance.querySelectorAll('.rs-tag').length, 2);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-tag-icon-close'));
  });

  it('Should not render tag close icon', () => {
    const instance = getDOMNode(
      <TagPicker
        data={data}
        defaultValue={['Kariane']}
        tagProps={{
          closable: false
        }}
      />
    );

    assert.ok(!instance.querySelector('.rs-tag-icon-close'));
  });

  it('Should render a span tag', () => {
    const instance = getDOMNode(
      <TagPicker
        data={data}
        defaultValue={['Kariane']}
        tagProps={{
          as: 'span'
        }}
      />
    );
    assert.equal(instance.querySelector('.rs-tag').tagName, 'SPAN');
  });
});
