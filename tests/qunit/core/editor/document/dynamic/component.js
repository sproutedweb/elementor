import Elements from '../helpers/elements';

QUnit.module( 'Component: document/dynamic', () => {
	QUnit.module( 'Single Selection', () => {
		QUnit.test( 'Settings', ( assert ) => {
			const eButton = Elements.createAutoButton(),
				dynamicTag = '[elementor-tag id="33e3c57" name="post-custom-field" settings="%7B%7D"]',
				dynamicValue = '{ dynamic text }',
				{ id, name, settings } = elementor.dynamicTags.tagTextToTagData( dynamicTag ),
				tag = elementor.dynamicTags.createTag( id, name, settings ),
				key = elementor.dynamicTags.createCacheKey( tag );

			// Set fake data.
			elementor.dynamicTags.cache[ key ] = dynamicValue;

			let done;

			eButton.view.attachElContent = function( html ) {
				eButton.view.$el.empty().append( html );

				done();

				assert.equal( eButton.view.$el.find( '.button-text' ).html(), dynamicValue,
					`button text changed to dynamic value: '${ dynamicValue }'` );
			};

			$e.run( 'document/dynamic/settings', {
				container: eButton,
				settings: { text: dynamicTag },
			} );

			done = assert.async();
		} );

		QUnit.test( 'Enable', ( assert ) => {
			const eButton = Elements.createAutoButton(),
				eButtonText = eButton.settings.get( 'text' ),
				dynamicTag = '[elementor-tag id="33e3c57" name="post-custom-field" settings="%7B%7D"]',
				dynamicValue = '{ dynamic text }',
				{ id, name, settings } = elementor.dynamicTags.tagTextToTagData( dynamicTag ),
				tag = elementor.dynamicTags.createTag( id, name, settings ),
				key = elementor.dynamicTags.createCacheKey( tag );

			// Set fake data.
			elementor.dynamicTags.cache[ key ] = dynamicValue;

			let doneEnable;

			eButton.view.attachElContent = function( html ) {
				eButton.view.$el.empty().append( html );

				assert.equal( eButton.view.$el.find( '.button-text' ).html(), dynamicValue,
					`button text changed to dynamic value: '${ dynamicValue }'` );

				doneEnable();
			};

			$e.run( 'document/dynamic/enable', {
				container: eButton,
				settings: { text: dynamicTag },
			} );

			doneEnable = assert.async();
		} );

		QUnit.test( 'Disable', ( assert ) => {
			const eButton = Elements.createAutoButton(),
				eButtonText = eButton.settings.get( 'text' ),
				dynamicTag = '[elementor-tag id="33e3c57" name="post-custom-field" settings="%7B%7D"]',
				dynamicValue = '{ dynamic text }',
				{ id, name, settings } = elementor.dynamicTags.tagTextToTagData( dynamicTag ),
				tag = elementor.dynamicTags.createTag( id, name, settings ),
				key = elementor.dynamicTags.createCacheKey( tag );

			// Set fake data.
			elementor.dynamicTags.cache[ key ] = dynamicValue;

			let doneEnable;

			eButton.view.attachElContent = function( html ) {
				eButton.view.$el.empty().append( html );

				doneEnable();
			};

			$e.run( 'document/dynamic/enable', {
				container: eButton,
				settings: { text: dynamicTag },
			} );

			doneEnable = assert.async();

			$e.run( 'document/dynamic/disable', {
				container: eButton,
				settings: { text: dynamicTag },
			} );

			setTimeout( () => {
				assert.equal( eButton.view.$el.find( '.button-text' ).html(), eButtonText,
					`button text changed disabled to non-dynamic value: '${ eButtonText }'` );
			} );
		} );
	} );

	QUnit.module( 'Multiple Selection', () => {
		QUnit.test( 'Settings', ( assert ) => {
			const eButtons = Elements.multiCreateAutoButton(),
				dynamicTag = '[elementor-tag id="33e3c57" name="post-custom-field" settings="%7B%7D"]',
				dynamicValue = '{ dynamic text }',
				{ id, name, settings } = elementor.dynamicTags.tagTextToTagData( dynamicTag ),
				tag = elementor.dynamicTags.createTag( id, name, settings ),
				key = elementor.dynamicTags.createCacheKey( tag );

			// Set fake data.
			elementor.dynamicTags.cache[ key ] = dynamicValue;

			let done;

			eButtons.forEach( ( eButton ) => {
				eButton.view.attachElContent = function( html ) {
					eButton.view.$el.empty().append( html );

					if ( eButton === eButtons[ eButtons.length - 1 ] ) {
						done();
					}

					assert.equal( eButton.view.$el.find( '.button-text' ).html(), dynamicValue,
						`button with id: '${ eButton.id }' - text changed to dynamic value: '${ dynamicValue }'` );
				};
			} );

			$e.run( 'document/dynamic/settings', {
				containers: eButtons,
				settings: { text: dynamicTag },
			} );

			done = assert.async();
		} );
	} );
} );
