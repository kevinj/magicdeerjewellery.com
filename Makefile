PERL='/sw/bin/perl5.8.6'

ALL_TEMPLATES=$(wildcard template/*.tt2)
TEMPLATES=$(filter-out template/wrapper.tt2,$(ALL_TEMPLATES))
HTML=$(TEMPLATES:template/%.tt2=%.html)

all: $(HTML)

clean:
	rm $(HTML)

$(HTML): $(ALL_TEMPLATES)
	$(PERL) bin/process $(@:%.html=%)
