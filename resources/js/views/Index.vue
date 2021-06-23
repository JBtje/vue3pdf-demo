<template>
    <div class="py-8">
        <div style="width: 100%; max-width:800px; margin: 0 auto;">
            <pdf ref="pdf"
                 style="border: 1px solid black"
                 class="mb-6"
                 :src="pdf.src"
                 :page="pdf.page"
                 :rotate="pdf.rotate"

                 @password="passwordEvent"
                 @progress="progressEvent"
                 @numPages="pdf.numPages = $event"
                 @loaded="loadedEvent"
                 @error="errorEvent"
                 @pageLoaded="pageLoadedEvent"
                 @pageSize="pageSizeEvent"
                 @linkClicked="linkClickedEvent"
            ></pdf>

            <div class="flex justify-between">
                <div>
                    {{ $t( 'rotate' ) }}:
                    <input type="button"
                           class="p-2"
                           @click="pdf.rotate += 90"
                           value="&#x27F3;"
                    />
                    <input type="button"
                           class="p-2 ml-1"
                           @click="pdf.rotate -= 90"
                           value="&#x27F2;"
                    />
                </div>

                <div>
                    <input type="button"
                           class="p-2 ml-1"
                           @click="prevPage"
                           value="&#x0003C;"
                    />

                    {{ pdf.page }} / {{ pdf.numPages }}

                    <input type="button"
                           class="p-2 ml-1"
                           @click="nextPage"
                           value="&#x0003E;"
                    />
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
// Components
// @ts-ignore
import pdf from '@jbtje/vue3pdf'

export default {
    components: {
        pdf
    },

    data() {
        return {
            pdf: {
                src:      null,
                filename: '',
                filesize: 0,

                page:     1, // dont set to 0
                numPages: 1, // dont set to 0
                rotate:   0,
            },
        };
    },

    methods: {
        getPdf() {
            axios( {
                url:          '/spa/pdf/download',
                method:       'POST',
                responseType: 'blob',
                data:         {},
            } ).then( async( response ) => {
                if( response.headers['content-disposition'] ) {
                    this.pdf.src      = window.URL.createObjectURL( new Blob( [response.data] ) );
                    this.pdf.filename = response.headers['content-disposition'].replace( /attachment; filename=/, '' ).replaceAll( '"', '' );
                    this.pdf.filesize = response.headers['content-length'];
                }
                else {
                    // Show (error) message.
                    let resp  = {data: null};
                    resp.data = await new Response( response.data ).text();
                    resp.data = JSON.parse( resp.data );
                    console.log( resp );
                }
            } )
               .catch( ( error ) => {
                   console.error( error );
               } );
        },

        prevPage() {
            if( this.pdf.page - 1 < 1 ) {
                return;
            }
            this.pdf.page = this.pdf.page - 1;
        },

        nextPage() {
            if( this.pdf.page + 1 > this.pdf.numPages ) {
                return;
            }
            this.pdf.page = this.pdf.page + 1;
        },

        pdfError( err ) {
            console.log( err );
        },

        passwordEvent( event ) {
            console.log( 'passwordEvent', event );
        },
        progressEvent( event ) {
            console.log( 'progressEvent', event );
        },
        loadedEvent() {
            console.log( 'loadedEvent' );
        },
        errorEvent( event ) {
            console.log( 'errorEvent', event );
        },
        pageLoadedEvent( event ) {
            console.log( 'pageLoadedEvent', event );
        },
        pageSizeEvent( event ) {
            console.log( 'pageSizeEvent', event );
        },
        linkClickedEvent( event ) {
            console.log( 'linkClickedEvent', event );
        },
    },

    mounted() {
        this.getPdf();
    },
};
</script>