import { describe, it, expect } from 'vitest';
import sinon from 'sinon';
import { render } from 'vitest-browser-svelte';

import Controls from '$lib/components/controls/controls.svelte';


describe('controls', () => {
    describe('Controls component', () => {
        it('renders component', () => {
            render(Controls);


        });
    });
    // describe('workUpdateState', () => {
    //     const test = workUpdateState();
    //     expect('x').toEqual('x');
    // });
});

