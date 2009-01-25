PERL='/sw/bin/perl5.8.6'

TEMPLATES=$(wildcard template/*.tt2)
HTML=$(TEMPLATES:template/%.tt2=html/%.html)

all: $(HTML)

$(HTML): $(TEMPLATES)
	$(PERL) bin/process $(@:html/%.html=%)
