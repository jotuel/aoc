my @a;
my %m;
my $pp;
my @final;

# class Passport {
#   has Int $.byr;
#   has Int $.iyr;
#   has Int $.eyr;
#   has Str $.hgt;
#   has Str $.hcl;
#   has Str $.ecl;
#   has Str $.pid;
# }

for "input".IO.lines {
    if $_.item.Bool {
        @a.append($_);
    } elsif @a.match('byr').item.Bool && @a.match('iyr').item.Bool && @a.match('eyr').item.Bool && @a.match('hgt').item.Bool && @a.match('hcl').item.Bool && @a.match('ecl').item.Bool && @a.match('pid').item.Bool {
        %m.append(@a.split(/' '/).split(/':'/).split(/' '/));
        @a = Empty;
        # @final.append(Passport.new(%m.pairs));
        # for %m.pairs { say $_; }


        # %m = Empty;
        # say @final;

    }  else {
      @a = Empty;
    }
}
# say @final.values;
for %m.hash {
    $pp = 0;
    when $_.keys.match('hgt') { for $_.values.split(' ') -> $k { $pp++; if $k.match('cm') && $k ~~ 150..193 || $k.match('in') && $k ~~ 59..76 {  @final.append($pp); } }  }
    when $_.keys.match('byr') { for $_.values.split(' ') -> $k { $pp++; if $k ~~ 1920..2002 {  @final.append($pp); } }  }
    when $_.keys.match('eyr') { for $_.values.split(' ') -> $k { $pp++; if $k ~~ 2020..2030 {  @final.append($pp); } }  }
    when $_.keys.match('hcl') { for $_.values.split(' ') -> $k { $pp++; if $k ~~ /"#"<xdigit><xdigit><xdigit><xdigit><xdigit><xdigit>/ {  @final.append($pp); } }  }
    when $_.keys.match('ecl') { for $_.values.split(' ') -> $k { $pp++; if $k ~~ /'amb' || 'blu' || 'brn' || 'gry' || 'grn' || 'hzl' || 'oth'/ {  @final.append($pp); } }  }
    when $_.keys.match('pid') { for $_.values.split(' ') -> $k { $pp++; if $k ~~ ^999999999 {  @final.append($pp); } }  }
    when $_.keys.match('iyr') { for $_.values.split(' ') -> $k { $pp++; if $k ~~ 2010..2020 {  @final.append($pp); } }  }
}
$pp = 0;
# say @final;
# @final = @final.sort;
my %countdown;
%countdown{$_}++ for @final;
for %countdown.values {
  if $_ == 7 { $pp++; }
}
say $pp;
# for @final.values {
#   if @finalnt < $_ {
#     @finalnt = $_;
#     if @final.grep($_).elems == 7 {
#       say $_;
#       $final++;
#     }
#   }
#   else {
#     last;
#   }
# }
#for @final.values {
#  say $_;
#  say @final.grep($_).sum == 7;
#}
#say @final;
#        %m = Map.new(@a.split(/":"/));
#        if @a.match('byr').item.Bool && @a.match('iyr').item.Bool && @a.match('eyr').item.Bool && @a.match('hgt').item.Bool && @a.match('hcl').item.Bool && @a.match('ecl').item.Bool && @a.match('pid').item.Bool { }
