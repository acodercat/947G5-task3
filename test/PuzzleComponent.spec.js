import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PuzzleComponent from '@/components/PuzzleComponent.vue';



describe('PuzzleComponent', () => {

    global.alert = function (message) {};


  // Test to check if the component renders properly
  it('renders properly', () => {
    const wrapper = mount(PuzzleComponent);
    expect(wrapper.exists()).toBe(true);
  });

  // Test to ensure all images are loaded and displayed
  it('loads and displays images', () => {
    const wrapper = mount(PuzzleComponent);
    const images = wrapper.findAll('v-img');
    expect(images.length).toBe(wrapper.vm.images.length);
  });

 it('renders correctly with initial data', () => {
    const wrapper = mount(PuzzleComponent);
    expect(wrapper.find('.puzzle-grid').exists()).toBeTruthy();
    expect(wrapper.findAll('.grid-cell').length).toBe(55); // 11x5 grid
    expect(wrapper.findAll('v-img').length).toBe(12); // 12 images
  });

  it('has the correct initial data', () => {
    const wrapper = mount(PuzzleComponent);
    expect(wrapper.vm.images.length).toBe(12);
    expect(wrapper.vm.gridState.length).toBe(11);
    expect(wrapper.vm.gridState[0].length).toBe(5);
  });


  it('changes cell color on click', async () => {
    const wrapper = mount(PuzzleComponent);
    const firstCell = wrapper.find('.grid-cell');
    await firstCell.trigger('click');
    expect(wrapper.vm.gridState[0][0]).not.toBe('#FFFFFF');
  });
 
  it('solves the puzzle correctly', async () => {
    const wrapper = mount(PuzzleComponent);
    await wrapper.vm.solvePuzzle();
    expect(wrapper.vm.isSolutionFound).toBeTruthy();
    expect(wrapper.vm.boards.length).toBeGreaterThan(0);
  });
});