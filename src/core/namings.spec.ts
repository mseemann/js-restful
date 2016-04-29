
import * as namings from './namings';

describe('namings', () => {

    it('should build a metadata name for a string', () => {
        expect(namings.buildFullName('test')).toBe('js-restful:test');
    });

});