import { render, fireEvent } from '@testing-library/vue';
import GoADropdown from './dropdown.vue';

describe('Vue Dropdown component', () => {
  it('expands and collapses', async () => {
    const { getByRole, queryAllByRole } = render(GoADropdown, {
      props: {
        label: 'Fruits',
        options: [
          { name: 'Apple', value: 'apple' },
          { name: 'Banana', value: 'banana' },
          { name: 'Pear', value: 'pear' },
        ],
        description: 'Pick something from the list',
      },
    })

    const input = getByRole('search')

    // open
    await fireEvent.click(input);
    expect(queryAllByRole('listitem').length).toBe(3);

    // close
    await fireEvent.click(input);
    expect(queryAllByRole('listitem').length).toBe(0);
  })

  it('nothing happens when disabled', async () => {
    const { getByRole, queryAllByRole } = render(GoADropdown, {
      props: {
        label: 'Fruits',
        options: [
          { name: 'Apple', value: 'apple' },
          { name: 'Banana', value: 'banana' },
          { name: 'Pear', value: 'pear' },
        ],
        description: 'Pick something from the list',
        disabled: true
      },
    })

    const input = getByRole('search');

    // open attempt
    await fireEvent.click(input);
    expect(queryAllByRole('listitem').length).toBe(0);
  })

  it('contains all options', async () => {
    const { getByRole, queryAllByRole } = render(GoADropdown, {
      props: {
        label: 'Fruits',
        options: [
          { name: 'Apple', value: 'apple' },
          { name: 'Banana', value: 'banana' },
          { name: 'Pear', value: 'pear' },
        ],
        description: 'Pick something from the list',
      },
    })

    const input = getByRole('search');

    await fireEvent.click(input);

    expect(queryAllByRole('listitem')[0].innerHTML).toContain('Apple');
    expect(queryAllByRole('listitem')[1].innerHTML).toContain('Banana');
    expect(queryAllByRole('listitem')[2].innerHTML).toContain('Pear');
  })

  it('displays warning when is required and no items are selected', async () => {
    const { getByRole, queryByRole } = render(GoADropdown, {
      props: {
        label: 'Fruits',
        options: [
          { name: 'Apple', value: 'apple' },
          { name: 'Banana', value: 'banana' },
          { name: 'Pear', value: 'pear' },
        ],
        description: 'Pick something from the list',
        required: true,
      },
    });

    expect(queryByRole('alert')).toBeFalsy();
    await fireEvent.click(getByRole('search'));
    await fireEvent.click(document.querySelector('.dropdown-overlay'));
    expect(queryByRole('alert')).toBeTruthy();
  })

  it('binds preselected value', async () => {
    const { getByRole } = render(GoADropdown, {
      props: {
        label: 'Fruits',
        options: [
          { name: 'Apple', value: 'apple' },
          { name: 'Banana', value: 'banana' },
          { name: 'Pear', value: 'pear' },
        ],
        description: 'Pick something from the list',
        value: 'pear'
      },
    });

    expect(getByRole('search')).toHaveProperty('value', 'Pear');
  })

  it('binds preselected multiple values', async () => {
    const { getByRole } = render(GoADropdown, {
      props: {
        label: 'Fruits',
        options: [
          { name: 'Apple', value: 'apple' },
          { name: 'Banana', value: 'banana' },
          { name: 'Pear', value: 'pear' },
        ],
        description: 'Pick something from the list',
        multiple: true,
        values: ['banana', 'pear']
      },
    });

    expect(getByRole('search')).toHaveProperty('value', 'Banana, Pear');
  })

  it('allows for multi-select', async () => {
    const { getByRole, getByText } = render(GoADropdown, {
      props: {
        label: 'Fruits',
        options: [
          { name: 'Apple', value: 'apple' },
          { name: 'Banana', value: 'banana' },
          { name: 'Pear', value: 'pear' },
        ],
        description: 'Pick something from the list',
        multiple: true
      },
    });

    // show item list
    await fireEvent.click(getByRole('search'));
    // select items
    await fireEvent.click(getByText('Apple'));
    await fireEvent.click(getByText('Pear'));
    // close list
    await fireEvent.click(document.querySelector('.dropdown-overlay'));
    // items are selected
    expect(getByRole('search')).toHaveProperty('value', 'Apple, Pear');
  })

  it('searches with typeAheadMode of contains', async () => {
    const { getByRole, queryAllByRole } = render(GoADropdown, {
      props: {
        label: 'Fruits',
        options: [
          { name: 'Apple', value: 'apple' },
          { name: 'Pineapple', value: 'pineapple' },
          { name: 'Pear', value: 'pear' },
        ],
        description: 'Pick something from the list',
        typeAheadMode: 'contains'
      },
    })

    await fireEvent.click(getByRole('search'));
    expect(queryAllByRole('listitem').length).toBe(3);
    const search = getByRole('search')
    await fireEvent.update(search, 'ppl')
    expect(queryAllByRole('listitem').length).toBe(2)
  })

  it('searches with typeAheadMode of startsWith', async () => {
    const { getByRole, queryAllByRole } = render(GoADropdown, {
      props: {
        label: 'Snacks',
        options: [
          { name: 'Apple', value: 'apple' },
          { name: 'Banana', value: 'banana' },
          { name: 'Pear', value: 'pear' },
          { name: 'Banana Bread', value: 'banana bread' },
        ],
        description: 'Pick something from the list',
        typeAheadMode: 'startsWith'
      },
    })

    await fireEvent.click(getByRole('search'));
    expect(queryAllByRole('listitem').length).toBe(4);
    const search = getByRole('search')
    await fireEvent.update(search, 'ban')
    expect(queryAllByRole('listitem').length).toBe(2)
  })
})
