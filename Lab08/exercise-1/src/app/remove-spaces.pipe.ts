// src/app/remove-spaces.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpaces'
})
export class RemoveSpacesPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    // Replace all dashes with a space
    return value.replace(/-/g, ' ');
  }
}
