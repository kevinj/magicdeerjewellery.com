PERL=$(shell which perl)

PASS=$(shell cat .pass)
ALL_TEMPLATES=$(wildcard template/*.tt2)
OTHER_TEMPLATES=template/wrapper.tt2 template/rollover.tt2 template/gallery.tt2 template/construction.tt2
TEMPLATES=$(filter-out $(OTHER_TEMPLATES),$(ALL_TEMPLATES))
HTML=$(TEMPLATES:template/%.tt2=%.html)

all: $(HTML)

clean:
	rm $(HTML)

%.html: $(OTHER_TEMPLATES) template/%.tt2
	$(PERL) bin/process $(@:%.html=%) $(TIME)
	@grep $@ .gitignore >/dev/null || echo $@ >> .gitignore && :

upload-construction: construction.html
	[ -d construction ] || mkdir construction;
	for file in $(HTML); do \
	    cp construction.html construction/$$file; \
	done;
	scp -P 222 construction/*.html vanjew@magicdeerjewellery.com:

upload-html:
	scp -P 222 -r *.html css/ vanjew@magicdeerjewellery.com:

upload-js:
	scp -P 222 -r javascript/ vanjew@magicdeerjewellery.com:

upload-images:
	scp -P 222 -r images/ vanjew@magicdeerjewellery.com:

upload: upload-construction upload-html upload-js upload-images
